'use client';

import { useState, useEffect } from 'react';
import styles from './admin.module.scss';

// ============================================
// ТИПЫ
// ============================================

interface ServiceItem {
    title: string;
    price: number;
}

interface Service {
    id: number;
    href: string;
    title: string;
    shortDescription: string;
    description: string;
    price: number;
    time: string;
    categoryId: string;
    meta: {
        title: string;
        description: string;
        keywords?: string[];
    };
    items?: ServiceItem[];
}

interface Category {
    id: number;
    title: string;
    href: string;
    description: string;
    items: string[];
    meta: {
        title: string;
        description: string;
    };
}

interface Data {
    services: Record<string, Service>;
    categories: Record<string, Category>;
}

// ============================================
// КОМПОНЕНТ ВХОДА
// ============================================

function Login({ onLogin }: { onLogin: () => void }) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'admin123') {
            localStorage.setItem('adminAuth', 'true');
            onLogin();
        } else {
            setError('Неверный пароль');
            setPassword('');
        }
    };

    return (
        <div className={styles.loginPage}>
            <div className={styles.loginBox}>
                <h1>🛠 Админка</h1>
                <p className={styles.subtitle}>Введите пароль для входа</p>
                <form onSubmit={handleSubmit} className={styles.loginForm}>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Введите пароль"
                        className={styles.loginInput}
                        autoFocus
                    />
                    {error && <div className={styles.error}>{error}</div>}
                    <button type="submit" className={styles.loginBtn}>
                        Войти
                    </button>
                </form>
                <p className={styles.hint}>Пароль: admin123</p>
            </div>
        </div>
    );
}

// ============================================
// ОСНОВНАЯ СТРАНИЦА АДМИНКИ
// ============================================

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [data, setData] = useState<Data | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

    // Проверка авторизации
    useEffect(() => {
        const auth = localStorage.getItem('adminAuth');
        if (auth === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    // Загрузка данных
    useEffect(() => {
        if (!isAuthenticated) return;

        fetch('/api/admin/data')
            .then(res => res.json())
            .then(data => {
                setData(data);
                // Разворачиваем все категории по умолчанию
                const expanded: Record<string, boolean> = {};
                Object.keys(data.categories).forEach(key => {
                    expanded[key] = true;
                });
                setExpandedCategories(expanded);
                setLoading(false);
            })
            .catch(() => {
                setMessage('❌ Ошибка загрузки');
                setLoading(false);
            });
    }, [isAuthenticated]);

    const saveData = async () => {
        if (!data) return;
        setSaving(true);
        setMessage('');

        try {
            const res = await fetch('/api/admin/data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await res.json();
            setMessage(result.success ? '✅ Сохранено!' : '❌ Ошибка');
        } catch {
            setMessage('❌ Ошибка соединения');
        } finally {
            setSaving(false);
        }
    };

    // Обновление категории
    const updateCategory = (slug: string, field: string, value: any) => {
        if (!data) return;
        setData({
            ...data,
            categories: {
                ...data.categories,
                [slug]: { ...data.categories[slug], [field]: value }
            }
        });
    };

    // Обновление услуги
    const updateService = (slug: string, field: string, value: any) => {
        if (!data) return;
        setData({
            ...data,
            services: {
                ...data.services,
                [slug]: { ...data.services[slug], [field]: value }
            }
        });
    };

    // Добавление услуги в категорию
    const addServiceToCategory = (categorySlug: string) => {
        if (!data) return;

        const services = Object.values(data.services);
        const maxId = services.length > 0 ? Math.max(...services.map(s => s.id)) : 0;
        const newId = maxId + 1;
        const slug = `new-${newId}`;

        // Добавляем услугу в список услуг
        const newServices = {
            ...data.services,
            [slug]: {
                id: newId,
                href: slug,
                title: 'Новая услуга',
                shortDescription: 'Краткое описание',
                description: 'Полное описание',
                price: 0,
                time: '30 мин',
                categoryId: categorySlug,
                meta: {
                    title: 'Новая услуга',
                    description: 'SEO описание'
                },
                items: []
            }
        };

        // Добавляем слаг услуги в категорию
        const category = data.categories[categorySlug];
        const newCategories = {
            ...data.categories,
            [categorySlug]: {
                ...category,
                items: [...category.items, slug]
            }
        };

        setData({
            services: newServices,
            categories: newCategories
        });
    };

    // Удаление услуги из категории
    const deleteService = (serviceSlug: string, categorySlug: string) => {
        if (!data || !confirm('Удалить услугу?')) return;

        // Удаляем услугу из списка
        const newServices = { ...data.services };
        delete newServices[serviceSlug];

        // Удаляем слаг из категории
        const category = data.categories[categorySlug];
        const newCategories = {
            ...data.categories,
            [categorySlug]: {
                ...category,
                items: category.items.filter(item => item !== serviceSlug)
            }
        };

        setData({
            services: newServices,
            categories: newCategories
        });
    };

    // Добавление категории
    const addCategory = () => {
        if (!data) return;
        const categories = Object.values(data.categories);
        const maxId = categories.length > 0 ? Math.max(...categories.map(c => c.id)) : 0;
        const newId = maxId + 1;
        const slug = `new-cat-${newId}`;

        setData({
            ...data,
            categories: {
                ...data.categories,
                [slug]: {
                    id: newId,
                    title: 'Новая категория',
                    href: slug,
                    description: 'Описание категории',
                    items: [],
                    meta: {
                        title: 'Новая категория',
                        description: 'SEO описание'
                    }
                }
            }
        });

        // Разворачиваем новую категорию
        setExpandedCategories(prev => ({ ...prev, [slug]: true }));
    };

    // Удаление категории
    const deleteCategory = (slug: string) => {
        if (!data || !confirm('Удалить категорию и все услуги в ней?')) return;

        // Удаляем все услуги в категории
        const category = data.categories[slug];
        const newServices = { ...data.services };
        category.items.forEach(serviceSlug => {
            delete newServices[serviceSlug];
        });

        // Удаляем категорию
        const newCategories = { ...data.categories };
        delete newCategories[slug];

        setData({
            services: newServices,
            categories: newCategories
        });
    };

    // Переключение разворачивания категории
    const toggleCategory = (slug: string) => {
        setExpandedCategories(prev => ({
            ...prev,
            [slug]: !prev[slug]
        }));
    };

    const logout = () => {
        localStorage.removeItem('adminAuth');
        setIsAuthenticated(false);
    };

    // Если не авторизован - показываем вход
    if (!isAuthenticated) {
        return <Login onLogin={() => setIsAuthenticated(true)} />;
    }

    // Загрузка
    if (loading) return <div className={styles.loading}>Загрузка...</div>;
    if (!data) return <div className={styles.errorText}>Ошибка загрузки</div>;

    // Основной интерфейс
    return (
        <div className={styles.adminPage}>
            {/* Шапка */}
            <div className={styles.header}>
                <h1>🛠 Админка</h1>
                <div className={styles.headerButtons}>
                    <button
                        onClick={logout}
                        className={`${styles.btn} ${styles.btnLogout}`}
                    >
                        🚪 Выйти
                    </button>
                    <button
                        onClick={saveData}
                        disabled={saving}
                        className={`${styles.btn} ${styles.btnSave}`}
                    >
                        {saving ? 'Сохранение...' : '💾 Сохранить все'}
                    </button>
                </div>
            </div>

            {/* Сообщение */}
            {message && (
                <div className={`${styles.message} ${message.includes('✅') ? styles.messageSuccess : styles.messageError}`}>
                    {message}
                </div>
            )}

            {/* Категории с услугами */}
            <div className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2>📂 Категории и услуги ({Object.keys(data.categories).length})</h2>
                    <button
                        onClick={addCategory}
                        className={`${styles.btn} ${styles.btnAdd}`}
                    >
                        + Добавить категорию
                    </button>
                </div>

                {Object.entries(data.categories).map(([catSlug, category]) => {
                    // Получаем услуги этой категории
                    const categoryServices = category.items
                        .map(slug => data.services[slug])
                        .filter(Boolean);

                    const isExpanded = expandedCategories[catSlug];

                    return (
                        <div key={catSlug} className={styles.categoryCard}>
                            {/* Заголовок категории */}
                            <div
                                className={styles.categoryHeader}
                                onClick={() => toggleCategory(catSlug)}
                            >
                                <div className={styles.categoryInfo}>
                                    <span className={styles.categoryTitle}>
                                        {category.title || 'Без названия'}
                                    </span>
                                    <span className={styles.categoryBadge}>
                                        {categoryServices.length} услуг
                                    </span>
                                    <span className={styles.categoryBadge}>
                                        ID: {category.id}
                                    </span>
                                </div>
                                <div className={styles.categoryActions}>
                                    <button
                                        className={styles.btnCollapse}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleCategory(catSlug);
                                        }}
                                    >
                                        {isExpanded ? '▲' : '▼'}
                                    </button>
                                    <button
                                        className={styles.btnDelete}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteCategory(catSlug);
                                        }}
                                    >
                                        🗑
                                    </button>
                                </div>
                            </div>

                            {/* Контент категории */}
                            {isExpanded && (
                                <div className={styles.categoryContent}>
                                    {/* Поля категории */}
                                    <div className={styles.categoryFields}>
                                        <input
                                            value={category.title}
                                            onChange={(e) => updateCategory(catSlug, 'title', e.target.value)}
                                            className={styles.input}
                                            placeholder="Название категории"
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                        <textarea
                                            value={category.description}
                                            onChange={(e) => updateCategory(catSlug, 'description', e.target.value)}
                                            rows={2}
                                            className={styles.categoryDescription}
                                            placeholder="Описание категории"
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                        <div className={styles.categoryMeta}>
                                            <input
                                                value={category.meta?.title || ''}
                                                onChange={(e) => updateCategory(catSlug, 'meta', {
                                                    ...category.meta,
                                                    title: e.target.value
                                                })}
                                                className={styles.input}
                                                placeholder="SEO заголовок"
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                            <input
                                                value={category.meta?.description || ''}
                                                onChange={(e) => updateCategory(catSlug, 'meta', {
                                                    ...category.meta,
                                                    description: e.target.value
                                                })}
                                                className={styles.input}
                                                placeholder="SEO описание"
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        </div>
                                    </div>

                                    {/* Услуги категории */}
                                    <div>
                                        <div className={styles.servicesHeader}>
                                            <h4>🔧 Услуги ({categoryServices.length})</h4>
                                            <button
                                                className={`${styles.btn} ${styles.btnAdd}`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    addServiceToCategory(catSlug);
                                                }}
                                            >
                                                + Добавить услугу
                                            </button>
                                        </div>

                                        {categoryServices.map((service) => (
                                            <div key={service.href} className={styles.serviceCard}>
                                                <div className={styles.serviceHeader}>
                                                    <input
                                                        value={service.title}
                                                        onChange={(e) => updateService(service.href, 'title', e.target.value)}
                                                        className={`${styles.input} ${styles.serviceTitle}`}
                                                        placeholder="Название услуги"
                                                    />
                                                    <button
                                                        className={styles.btnDelete}
                                                        onClick={() => deleteService(service.href, catSlug)}
                                                    >
                                                        ✕
                                                    </button>
                                                </div>

                                                <input
                                                    value={service.shortDescription}
                                                    onChange={(e) => updateService(service.href, 'shortDescription', e.target.value)}
                                                    className={styles.input}
                                                    placeholder="Краткое описание"
                                                />

                                                <textarea
                                                    value={service.description}
                                                    onChange={(e) => updateService(service.href, 'description', e.target.value)}
                                                    rows={2}
                                                    className={styles.textarea}
                                                    placeholder="Полное описание"
                                                />

                                                <div className={styles.rowGap}>
                                                    <input
                                                        type="number"
                                                        value={service.price}
                                                        onChange={(e) => updateService(service.href, 'price', Number(e.target.value))}
                                                        className={`${styles.input} ${styles.inputNumber}`}
                                                        placeholder="Цена"
                                                    />
                                                    <input
                                                        value={service.time}
                                                        onChange={(e) => updateService(service.href, 'time', e.target.value)}
                                                        className={`${styles.input} ${styles.inputMedium}`}
                                                        placeholder="Время"
                                                    />
                                                </div>

                                                {/* Внутренние услуги */}
                                                {service.items && (
                                                    <div className={styles.innerServices}>
                                                        <div className={styles.label}>Внутренние услуги:</div>
                                                        {service.items.map((item, idx) => (
                                                            <div key={idx} className={styles.innerItem}>
                                                                <input
                                                                    value={item.title}
                                                                    onChange={(e) => {
                                                                        const items = [...(service.items || [])];
                                                                        items[idx] = { ...item, title: e.target.value };
                                                                        updateService(service.href, 'items', items);
                                                                    }}
                                                                    className={styles.input}
                                                                    placeholder="Название"
                                                                />
                                                                <input
                                                                    type="number"
                                                                    value={item.price}
                                                                    onChange={(e) => {
                                                                        const items = [...(service.items || [])];
                                                                        items[idx] = { ...item, price: Number(e.target.value) };
                                                                        updateService(service.href, 'items', items);
                                                                    }}
                                                                    className={`${styles.input} ${styles.inputNumber}`}
                                                                    placeholder="Цена"
                                                                />
                                                                <button
                                                                    className={styles.btnRemoveItem}
                                                                    onClick={() => {
                                                                        const items = (service.items || []).filter((_, i) => i !== idx);
                                                                        updateService(service.href, 'items', items);
                                                                    }}
                                                                >
                                                                    ✕
                                                                </button>
                                                            </div>
                                                        ))}
                                                        <button
                                                            className={styles.btnAddItem}
                                                            onClick={() => {
                                                                const items = [...(service.items || []), { title: '', price: 0 }];
                                                                updateService(service.href, 'items', items);
                                                            }}
                                                        >
                                                            + Добавить внутреннюю услугу
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Подвал */}
            <div className={styles.footer}>
                Всего: {Object.keys(data.services).length} услуг, {Object.keys(data.categories).length} категорий
            </div>
        </div>
    );
}