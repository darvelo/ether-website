import { View } from 'ether';

class DownloadView extends View {
    init(element) {
        this.element = element;
        this.DOMListen(this.element, 'click', this.click, this);
    }

    click(event) {
        event.preventDefault();
        event.stopPropagation();
        this.element.classList.add('active');
        this.DOMUnlisten(this.element, 'click', this.click, this);
    }
}

export default DownloadView;
