export function clickOutside(node: HTMLElement, ignoreNode?: HTMLElement) {

    const handleClick = (event: Event) => {
        const target = event.target as HTMLElement;
        if (!event.target || ignoreNode && ignoreNode.contains(target)) {
            return;
        }
        if (node && !node.contains(target) && !event.defaultPrevented) {
            node.dispatchEvent(
                new CustomEvent('clickOutside')
            );
        }
    }

    document.addEventListener('click', handleClick, true);

    return {
        destroy() {
            document.removeEventListener('click', handleClick, true);
        }
    };
};
