function createLinkTemplate(linkTo) {
    return function (data) {
        let { address, params, text } = data;
        let href = linkTo(address, params);
        return `
            <li data-address="${address}">
                <a href=${href}>${text}</a>
            </li>
        `;
    };
}

export default function navbarTemplate(ctx) {
    let { linksData, linkTo } = ctx;
    let listItems = linksData.map(createLinkTemplate(linkTo)).join('');
    return `
        <div class="container navbar-container">
            <a class="navbar-logo" href='/'>
                <img src="/public/images/logo.png" alt="Ether logo" />
                Ether
            </a>
            <ul class="navbar-list">
                ${listItems}
            </ul>
        </div>
    `;
}
