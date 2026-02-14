import css from "./Header.module.css"

export default function Header() {
    return (
        <div className={css.container}>
            <div className={css.logo}>
                <svg className={css.logoIcon}>
                    <use href="/symbol-defs.svg#icon-icon"/>
                </svg>
                <p className={css.logoText}> READ JOURNEY</p>
            </div>
            <nav className={css.navigation}>
                <p className={css.navItem}>Home</p>
                <p className={css.navItem}>My library</p>
            </nav>
            
        </div>
    )
}