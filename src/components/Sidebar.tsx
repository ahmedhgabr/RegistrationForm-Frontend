import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';

type SidebarItem = {
    id: string;
    label: string;
};

type SidebarProps = {
    items: SidebarItem[];
    activeId: string;
    onSelect: (id: string) => void;
    widthClassName?: string;
    className?: string;
};

function Sidebar({
    items,
    activeId,
    onSelect,
    widthClassName = 'w-64',
    className = '',
}: SidebarProps) {
    const { t } = useLanguage();
    return (
        <div className={`fixed left-0 top-0 h-screen ${widthClassName} border-r border-white/10 flex flex-col ${className}`}>
            <div className="p-6 border-b border-white/10">
                <h1 className="text-xl font-semibold text-white">{t('bueSystem')}</h1>
            </div>

            <nav className="flex-1 p-6 space-y-2">
                {items.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onSelect(item.id)}
                        className={`w-full text-left px-4 py-3 rounded-md transition font-medium ${
                            activeId === item.id
                                ? 'bg-indigo-500 text-white'
                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                        }`}
                    >
                        {item.label}
                    </button>
                ))}
            </nav>

            <div className="p-6 border-t border-white/10">
                <LanguageSwitcher />
            </div>
        </div>
    );
}

export default Sidebar;
