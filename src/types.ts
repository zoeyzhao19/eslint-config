/**
 * Any valid ECMAScript version number or 'latest':
 *
 * - A version: es3, es5, es6, es7, es8, es9, es10, es11, es12, es13, es14, ...
 * - A year: es2015, es2016, es2017, es2018, es2019, es2020, es2021, es2022, es2023, ...
 * - 'latest'
 *
 * @see https://typescript-eslint.io/packages/parser/#ecmaversion
 */
type EcmaVersion =
  | 3
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 2015
  | 2016
  | 2017
  | 2018
  | 2019
  | 2020
  | 2021
  | 2022
  | 2023
  | 'latest';

/**
 * For historical reasons, 
 * the boolean value false and the string value "readable" are equivalent to "readonly". 
 * Similarly, the boolean value true and the string value "writeable" are equivalent to "writable". 
 * However, the use of older values is deprecated.
 */
type GlobalReadonly = false | 'readable' | 'readonly';
type GlobalWriteable = true | 'writeable';

type Parser = { parse: (code: string, options: any) => any } | { parseForESLint: (code: string, options: any) => any }


/**
 * @see https://eslint.org/docs/latest/use/configure/configuration-files-new#configuration-objects
 */
export interface EslintFlatConfig {
  /**
   * An array of glob patterns indicating the files that the configuration object should apply to.
   *  If not specified, the configuration object applies to all files matched by any other configuration object.
   */
  files?: string[];

  /**
   * An array of glob patterns indicating the files that the configuration object should not apply to. 
   * If not specified, the configuration object applies to all files matched by files.
   */
  ignores?: string[];

  /**
   * An object containing settings related to how JavaScript is configured for linting.
   */
  languageOptions?: {
    /**
     * The version of ECMAScript to support. 
     * May be any year (i.e., 2022) or version (i.e., 5). 
     * Set to "latest" for the most recent supported version. (default: "latest")
     */
    ecmaVersion?: EcmaVersion;

    /**
     * The type of JavaScript source code. Possible values are "script" for traditional script files,
     * "module" for ECMAScript modules (ESM), 
     * and "commonjs" for CommonJS files. 
     * (default: "module" for .js and .mjs files; "commonjs" for .cjs files)
     */
    sourceType?: 'module' | 'script' | 'commonjs';

    /**
     * An object specifying additional objects that should be added to the global scope during linting.
     */
    globals?: Record<string, GlobalReadonly | GlobalWriteable | 'off'>

    /**
     * An object containing a parse() method or a parseForESLint() method. (default: espree)
     */
    parser?: Parser

    /**
     * An object specifying additional options that are passed directly to the parse() or parseForESLint() method on the parser. 
     * The available options are parser-dependent.
     */
    parserOptions?: Record<string, any>
  };

  /**
     * An object containing settings related to the linting process.
     */
  linterOptions?: {
    /**
     * A Boolean value indicating if inline configuration is allowed.
     */
    noInlineConfig?: boolean;

    /**
     * A severity string indicating if and how unused disable and enable directives should be tracked and reported. 
     * For legacy compatibility, true is equivalent to "warn" and false is equivalent to "off". (default: "off")
     */
    reportUnusedDisableDirectives?: boolean | 'warn' | 'off';
  }

  /**
   * Either an object containing preprocess() and postprocess() methods 
   * or a string indicating the name of a processor inside of a plugin (i.e., "pluginName/processorName")
   */
  // processor?: Processor | string;
}