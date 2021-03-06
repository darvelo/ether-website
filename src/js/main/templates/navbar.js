function createLinkTemplate(linkTo) {
    return function (data) {
        let { address, dest, params, text } = data;
        let href = linkTo(dest || address, params);
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
            <a class="navbar-logo" href='/'>Ether</a>
            <ul class="navbar-list">
                ${listItems}
            </ul>
        </div>
    `;
}
