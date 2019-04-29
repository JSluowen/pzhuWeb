module.exports = {
    extends: 'eslint-config-egg',
    parser: 'babel-eslint',
    rules: {
        'linebreak-style': [0, 'error', 'windows'],
        indent: ['error', 4],
        'comma-dangle': ['error', 'only-multiline'],
    },
};
