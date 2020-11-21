module.exports = ({ marked, loadLanguages }) => {
    loadLanguages(['typescript']);
    marked.use({
        renderer: {
        }
    });
}