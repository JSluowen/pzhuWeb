module.exports = {
    extends: 'eslint-config-egg',
    parser: 'babel-eslint',
    rules: {
        'linebreak-style': [0, 'error', 'windows'],
        indent: ['error', 2],
        'comma-dangle': ['error', 'only-multiline'],
        'array-bracket-spacing': [2, 'never'],
        "semi": [
            "error",
            "never" // 改成代码结尾不再加分号，加了分号报错，不加分号不报错
        ]

    },
};
