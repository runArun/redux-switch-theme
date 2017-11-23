import React, { Component } from 'react'
import ThemeSwitch from './ThemeSwitch'
import PropTypes from 'prop-types'
class Content extends Component {
    static contextTypes = {
        store: PropTypes.object
    }

    constructor () {
        super()
        this.state = { themeColor: '' }
    }

    componentWillMount () {
        const { store } = this.context
        this._updateThemeColor()
        store.subscribe(() => this._updateThemeColor())
    }
    //给 Header.js、Content.js、ThemeSwitch.js 的 componentWillMount 生命周期都加上监听数据变化重新渲染.
    _updateThemeColor () {
        const { store } = this.context
        const state = store.getState()
        this.setState({ themeColor: state.themeColor })
    }

    render () {
        return (
            <div>
                <p style={{ color: this.state.themeColor }}>React.js 小书内容</p>
                <ThemeSwitch />
            </div>
        )
    }
}

export default Content