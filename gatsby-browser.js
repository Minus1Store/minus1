require('./src/styles/global.scss')

exports.shouldUpdateScroll = () => {
    return false;
};

exports.onInitialClientRender = () => {
    const insertJS = () => {
    const addJS = (src) => {
        const s = document.createElement(`script`)
        s.type = `text/javascript`
        s.src = src
        document.getElementsByTagName(`head`)[0].appendChild(s)
    }
    
    addJS('https://www.2checkout.com/checkout/api/2co.min.js')
    }
}