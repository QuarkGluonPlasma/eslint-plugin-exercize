const { ESLint } = require("eslint");

const engine = new ESLint({
    fix: false,
    overrideConfig: {
        parserOptions: {
            ecmaVersion: 6,
        },
        rules: {
            'my-brace-style': ['error']
        }
    },
    rulePaths: [__dirname],
    useEslintrc: false
});

(async function main() {
    const results = await engine.lintText(`
        if (print) 
        {
            const num = a + b;
            console.log(num);
        }
        for(let i = 0;i<100;i++)
        {
            console.log(i);
        }
        while(a){

        }
  `);
  
    // console.log(results[0].output);
  
    const formatter = await engine.loadFormatter("stylish");
    const resultText = formatter.format(results);
    console.log(resultText);
  })();
