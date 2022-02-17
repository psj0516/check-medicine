const Alert =({open, close, title})=> {
    return(
        <div className={open ? 'openModal modal' : 'modal'}>
            {open ? (
                <section>
                    <header>모달
                        <button className="close" onClick={close}>X</button>
                    </header>
                    <main>{title} 을(를) 입력하세요.</main>
                    <button onClick={close}>확인</button>
                </section>
            ) : null
            }
        </div>
    )
}

export default Alert