import { View } from 'ether';

class DownloadView extends View {
    init(element) {
        this.element = element;
        this.DOMListen(this.element, 'click', 'click');
    }

    reset() {
        this.element.classList.remove('active');
    }

    click(event) {
        if (event.target.classList.contains('download-btn-start')) {
            event.preventDefault();
            event.stopPropagation();
            this.element.classList.add('active');
        }
    }
}

export default DownloadView;
