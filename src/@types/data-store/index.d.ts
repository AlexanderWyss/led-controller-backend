declare module "data-store" {
  export interface Options {
    debounce?: number;
    indent?: number;
    name?: string;
    home?: string;
    base?: string;
    path?: string;
  }

  /**
   * Initialize a new `Store` with the given `name`, `options` and `default` data.
   *
   * ```js
   * const store = require('data-store')('abc');
   * //=> '~/data-store/a.json'
   *
   * const store = require('data-store')('abc', { cwd: 'test/fixtures' });
   * //=> './test/fixtures/abc.json'
   * ```
   * @name Store
   * @param {string} `name` Store name to use for the basename of the `.json` file.
   * @param {object} `options` See all [available options](#options).
   * @param {object} `defaults` An object to initialize the store with.
   * @api public
   */
  export class Store {
    constructor(name: string, options?: Options, defaults?: any)

    /**
     * Assign `value` to `key` and save to the file system. Can be a key-value pair,
     * array of objects, or an object.
     *
     * ```js
     * // key, value
     * store.set('a', 'b');
     * //=> {a: 'b'}
     *
     * // extend the store with an object
     * store.set({a: 'b'});
     * //=> {a: 'b'}
     * ```
     * @name .set
     * @param {string} `key`
     * @param {any} `val` The value to save to `key`. Must be a valid JSON type: String, Number, Array or Object.
     * @return {object} `Store` for chaining
     * @api public
     */
    set(key: string, val: any): Store;

    /**
     * Add the given `value` to the array at `key`. Creates a new array if one
     * doesn't exist, and only adds unique values to the array.
     *
     * ```js
     * store.union('a', 'b');
     * store.union('a', 'c');
     * store.union('a', 'd');
     * store.union('a', 'c');
     * console.log(store.get('a'));
     * //=> ['b', 'c', 'd']
     * ```
     * @name .union
     * @param  {string} `key`
     * @param  {any} `val` The value to union to `key`. Must be a valid JSON type: String, Number, Array or Object.
     * @return {object} `Store` for chaining
     * @api public
     */
    union(key: string, ...rest: any): Store;

    /**
     * Get the stored `value` of `key`.
     *
     * ```js
     * store.set('a', {b: 'c'});
     * store.get('a');
     * //=> {b: 'c'}
     *
     * store.get();
     * //=> {a: {b: 'c'}}
     * ```
     * @name .get
     * @param {string} `key`
     * @return {any} The value to store for `key`.
     * @api public
     */
    get(key: string, fallback: any): any;

    /**
     * Returns `true` if the specified `key` has a value.
     *
     * ```js
     * store.set('a', 42);
     * store.set('c', null);
     *
     * store.has('a'); //=> true
     * store.has('c'); //=> true
     * store.has('d'); //=> false
     * ```
     * @name .has
     * @param {string} `key`
     * @return {boolean} Returns true if `key` has
     * @api public
     */
    has(key: string): boolean;

    /**
     * Returns `true` if the specified `key` exists.
     *
     * ```js
     * store.set('a', 'b');
     * store.set('b', false);
     * store.set('c', null);
     * store.set('d', true);
     * store.set('e', undefined);
     *
     * store.hasOwn('a'); //=> true
     * store.hasOwn('b'); //=> true
     * store.hasOwn('c'); //=> true
     * store.hasOwn('d'); //=> true
     * store.hasOwn('e'); //=> true
     * store.hasOwn('foo'); //=> false
     * ```
     * @name .hasOwn
     * @param {string} `key`
     * @return {boolean} Returns true if `key` exists
     * @api public
     */
    hasOwn(key: string): boolean;

    /**
     * Delete one or more properties from the store.
     *
     * ```js
     * store.set('foo.bar', 'baz');
     * console.log(store.data); //=> { foo: { bar: 'baz' } }
     * store.del('foo.bar');
     * console.log(store.data); //=> { foo: {} }
     * store.del('foo');
     * console.log(store.data); //=> {}
     * ```
     * @name .del
     * @param {string|Array} `keys` One or more properties to delete.
     * @api public
     */
    del(key: string | string[]): Store;

    /**
     * Return a clone of the `store.data` object.
     *
     * ```js
     * console.log(store.clone());
     * ```
     * @name .clone
     * @return {object}
     * @api public
     */
    clone(): any;

    /**
     * Clear `store.data` to an empty object.
     *
     * ```js
     * store.clear();
     * ```
     * @name .clear
     * @return {undefined}
     * @api public
     */
    clear(): void;

    /**
     * Stringify the store. Takes the same arguments as `JSON.stringify`.
     *
     * ```js
     * console.log(store.json(null, 2));
     * ```
     * @name .json
     * @return {string}
     * @api public
     */
    json(replacer?: (this: any, key: string, value: any) => any, space?: string | number): string;

    /**
     * Calls [.writeFile()](#writefile) to persist the store to the file system,
     * after an optional [debounce](#options) period. This method should probably
     * not be called directly as it's used internally by other methods.
     *
     * ```js
     * store.save();
     * ```
     * @name .save
     * @return {undefined}
     * @api public
     */
    save(): void;

    /**
     * Immediately write the store to the file system. This method should probably
     * not be called directly. Unless you are familiar with the inner workings of
     * the code it's recommended that you use .save() instead.
     *
     * ```js
     * store.writeFile();
     * ```
     * @name .writeFile
     * @return {undefined}
     */
    writeFile(): void;

    /**
     * Delete the store from the file system.
     *
     * ```js
     * store.unlink();
     * ```
     * @name .unlink
     * @return {undefined}
     * @api public
     */
    unlink(): void;

    /**
     * Load the store.
     * @return {object}
     */
    load(): any;
  }
}
