import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import { eslint } from 'rollup-plugin-eslint';
import pkg from './package.json';

const commonTerser = terser({
    compress: {
        // remove console.log
        // eslint-disable-next-line @typescript-eslint/camelcase
        pure_funcs: ['console.log']
    },
    output: {
        // add comment on the top
        preamble: `/*! ${pkg.name} - v${
            pkg.version
        } - ${new Date().toLocaleDateString()} https://niannings.github.io */`
    }
});

const plugins = [
    eslint({
        throwOnError: true,
        throwOnWarning: true,
        include: ['src/**'],
        exclude: ['node_modules/**']
    }),
    typescript(),
    babel({
        extensions: ['.js', '.ts', '.tsx'],
        exclude: 'node_modules/**'
    })
];

export default [
    {
        input: 'src/index.ts',
        output: {
            dir: 'lib',
            format: 'umd',
            name: 'pdfHtml'
            // plugins: [
            //     commonTerser
            // ]
        },
        plugins
    },
    {
        input: ['src/index.ts', 'src/react-pdf-html.tsx'],
        output: [
            {
                dir: 'dist',
                format: 'es'
            },
            {
                dir: 'es',
                format: 'es',
                plugins: [commonTerser]
            }
        ],
        plugins,
        external: ['ract', 'react-dom']
    }
];
