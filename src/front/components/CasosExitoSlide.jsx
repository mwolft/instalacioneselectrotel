export default function CasosExitoSlide({ logo, mercado, isMobile }) {
    return (
        <>
            {/*1*/}
            <div className='h-full w-full col-start-1 lg:col-start-4 col-span-1 row-start-1 relative overflow-visible'>
                <img src={logo} alt="Logo" className='h-full w-[100px] max-w-none lg:w-full object-contain absolute z-10 lg:mx-0' style={isMobile ? { right: '-220%' } : { right: '-25%' }} />
            </div>
            <div className='h-full w-full lg:col-start-5  col-start-1 col-span-8 lg:col-span-4 row-start-1 relative'>
                <img src={mercado} alt="Mercado" className='h-full w-full object-cover' />
                <div className='absolute inset-0 pointer-events-none' style={isMobile ? { background: 'linear-gradient(-105.5deg, rgba(255,255,255,0) 50%, rgba(255,255,255,1) 65%)', } : {
                    background: 'linear-gradient(-105.5deg, rgba(255,255,255,0) 50%, rgba(255,255,255,1) 80%)',
                }} />
            </div>
        </>
    )
}