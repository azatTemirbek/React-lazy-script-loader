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
        props.load === null && console.warn(`provide load props to LazyScriptLoader Component `)
        this.ListOfScripts = [];
        this.head = document.head || document.getElementsByTagName('head')[0];
        this.xscript = document.getElementsByTagName('script')[0];
        /** METHODS */
        this.onScriptLoad = () => {
            var problem = false;
            this.ListOfScripts.map(nameAndSrc => {
                if (!window[nameAndSrc.name]) {
                    problem = true;
                    console.warn('problem with ${'+nameAndSrc.name+'} script there is no such script on window object')
                    return null; 
                }
                return nameAndSrc;
            })
            if (!!this.props.load && this.props.load.constructor === Array && this.ListOfScripts.length === this.props.load.length && !problem) {
                this.setState({ loading: false });
            } else if (!!this.props.load && this.props.load.constructor === Object && this.ListOfScripts.length === 1 && !problem) { this.setState({ loading: false }) }
        }
        this.loadScript = ({ name, src }) => {
            let script = document.createElement('script');
            script.id = 'script-' + name;
            script.type = 'text/javascript'
            script.async = false
            script.src = src;
            this.xscript.parentNode.insertBefore(script, this.xscript);
            return script;
        }
        this.CSSIntoDom = (css = '') => {
            let style = document.createElement('style');
            style.type = 'text/css';
            if (style.styleSheet) { style.styleSheet.cssText = css } else { style.appendChild(document.createTextNode(css)) }
            this.head.appendChild(style);
        }
    }
    componentDidMount() {
        if (!!this.props.load && this.props.load.constructor === Array) {
            // [{name:'Azat',src:'source code'},{name:'Azat',src:'source code'}]
            this.props.load.map(nameAndSrc => {
                this.ListOfScripts = [...this.ListOfScripts, nameAndSrc];
                if (!window[nameAndSrc.name]) {
                    let script = this.loadScript(nameAndSrc);
                    script.addEventListener('load', e => this.onScriptLoad())
                } else this.onScriptLoad()
                return nameAndSrc;
            });
        } else if (!!this.props.load && this.props.load.constructor === Object) {
            // {name:'Azat',src:'source code'}
            this.ListOfScripts = [...this.ListOfScripts, this.props.load];
            if (!window[this.props.load.name]) {
                let script = this.loadScript(this.props.load);
                script.addEventListener('load', e => this.onScriptLoad())
            } else this.onScriptLoad()
        } else {
            console.warn(`provide load={name:'Azat',src:'source code'} to LazyScriptLoader`)
        }
        this.CSSIntoDom(this.props.css)
    }
    render() {
        return React.createElement(React.Fragment, {},
            this.state.loading && this.props.loading,
            !this.state.loading && this.props && this.props.children,
        )
    }
}
XLazyScriptLoader.propTypes = {
    css: PropTypes.string,
    load: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]).isRequired,
    children: PropTypes.node.isRequired
};