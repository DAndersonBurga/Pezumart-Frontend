const setTitleAndDescription = (title: string, description: string) => {
    document.title = `Pezumart - ${title}`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', description);
    }
}


export { setTitleAndDescription };