const Modal =({open, close, removeItem, removeAllItem})=> {
    return(
        <div className={open ? 'openModal modal' : 'modal'}>
            {open ? (
                <section>
                    <header>모달
                        <button className="close" onClick={close}>X</button>
                    </header>
                    <main>선택하세요</main>
                    <button onClick={removeItem}>이 예정만 삭제</button>
                    <button onClick={removeAllItem}>관련된 복용 예정을 모두 삭제</button>
                </section>
            ) : null
            }
        </div>
    )
}

export default Modal