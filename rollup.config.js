import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

export default {
    input: './src/index.ts',
    output: [
        {
            format: 'umd',
            name: 'printPdf',
            file: 'lib/index.js'
        },
        {
            format: 'umd',
            name: 'printPdf',
            file: 'lib/index.min.js'
        },
        {
            format: 'cjs',
            file: 'lib/index.cjs.js'
        },
        {
            format: 'es',
            file: 'lib/index.esm.js'
        }
    ],
    plugins: [
        typescript(),
        babel({
            extensions: ['.js', '.ts'],
            exclude: 'node_modules/**'
        }),
        terser({
            compress: {
                // remove console.log
                pure_funcs: ['console.log']
            },
            include: [/^.+\.min\.js$/, "*esm*"],
            output: {
                // add comment on the top
                preamble: `/*! ${pkg.name} - v${pkg.version} - ${new Date().toLocaleDateString()} https://niannings.github.io */`
            }
        })
    ]
};
