import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
/**
 * a function to load script from the CDN and apply css 
 * @example
 *  _(XLazyScriptLoader,{loading:React.createElement(CustomLoadingComponent,{options}),css:`.clas{color:red}`, load:[{name:'libName',src:'CDN'},{name:'libName',src:'CDN'}]||{name:'libName',src:'CDN'} }, childNode )
 */
export class XLazyScriptLoader extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
        /**
         * A function to insert css classes into Dom
         * @param {string} css - example '.aclass{display:none}'
         */
        this.CSSIntoDom = (css = '') => {
            let style = document.createElement('style');
            style.type = 'text/css';
            (style.styleSheet)? style.styleSheet.cssText = css : style.appendChild(document.createTextNode(css))
            document['head'].appendChild(style);
        }
        /**
         * a self invoking function to load js and css into Dom from source {cdn,server,local.....}
         */
        this.load = (() => {
            // Function which returns a function: https://davidwalsh.name/javascript-functions
            var _load = (tag) => {
                return (src) => {
                    // This promise will be used by Promise.all to determine success or failure
                    return new Promise( (resolve, reject) => {
                        let element = document.createElement(tag);
                        let parent = 'body';
                        let attr = 'src';
                        // Important success and error for the promise
                        element.onload = e => resolve(src);
                        element.onerror = e => reject(src);
                        // Need to set different attributes depending on tag type
                        switch (tag) {
                            case 'script':
                                element.async = this.props.async || false;
                                break;
                            case 'link':
                                element.type = 'text/css';
                                element.rel = 'stylesheet';
                                attr = 'href';
                                parent = 'head';
                                break;
                            default:
                        }
                        // Inject into document to kick off loading
                        element[attr] = src;
                        window.document[parent].appendChild(element);
                    });
                };
            }
            return {
                css: _load('link'),
                js:  _load('script'),
                img: _load('img')
            }
        })();
    }
    componentDidMount() {
        let arrayProm = []
        let {loadcss,loadjs, css} = this.props;
        loadcss && arrayProm.push(...(loadcss.constructor === Array)?loadcss.map(item=>this.load.css(item)):[this.load.css(loadcss)]);
        loadjs && arrayProm.push(...(loadjs.constructor === Array)?loadjs.map(item=>this.load.js(item)):[this.load.js(loadjs)]);
        Promise.all(arrayProm).then(() => {
            this.setState({ loading: false})
        }).catch(() => {
            console.error('Oh no, epic failure!');
            alert('Oh no, epic failure!');
        });
        this.CSSIntoDom(css)
    }
    render() {
        return React.createElement(React.Fragment, {},(this.state.loading)?this.props.loading:this.props.children)
    }
}
XLazyScriptLoader.propTypes = {
    async : PropTypes.bool, 
    css: PropTypes.string,
    loadjs: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.string,
    ]),
    loadcss: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.string,
    ]),
    children: PropTypes.node.isRequired
};
