export const Title = ({ children }) => {
    return (
        <h1 className="text-xl font-bold text-center">{ children }</h1>
    )
}

export const Subtitle = ({ children }) => {
    return (
        <p className="text-sm text-center">
            { children }
        </p>
    )
}

export const Section = ({ label }) => {
    return <>
        <p className="text-base font-bold">{ label }</p>
        <div className="w-full h-[2px] bg-black"></div>
    </>
}

export const Details = ({ company, position, date }) => {
    return (
        <div className="flex justify-between">
            <p>
                <b>{ company }</b> <br />
                { position }
            </p>
            <p>{ date }</p>
        </div>
    )
}

export const Bullets = ({ children }) => {
    const Li = (el, i) => <li key={i}> • { el }</li>
    const strings = children.filter(el => typeof el == "string")

    return (
        <ul>
            { strings.map(Li) }
        </ul>
    )
}

export const Social = ({ href }) => {
    const domain = new URL(href).hostname
    return <a href={href} className="underline mx-1">
        { domain }
    </a>
} 

export const Page = ({ children, font }) => {
    return (
        <div className="h-full p-4 bg-white m-4 shadow-lg aspect-root2">
            <UseGoogleFont name={font || 'EB Garamond'}/>
            { children }
        </div>
    )
}

export const UseGoogleFont = ({ name }) => {
    const css = `
    @import url('https://fonts.googleapis.com/css2?family=${encodeURIComponent(name)}:ital,wght@0,400..800;1,400..800&display=swap');
    * {
        font-family: ${name}, sans-serif;
    }
    `
    return <style> {css} </style>
}
