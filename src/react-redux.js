import React, { Component, PropTypes } from 'react'

export const connect = (mapStateToProps) => (WrappedComponent) => {
    class Connect extends Component {
        static contextTypes = {
            store: PropTypes.object
        }

        constructor () {
            super()
            this.state = { allProps: {} }
        }
        componentWillMount () {
            const { store } = this.context
            this._updateProps()
            store.subscribe(() => this._updateProps())
        }
        // 我们在 Connect 组件的 constructor 里面初始化了 state.allProps，它是一个对象，
        // 用来保存需要传给被包装组件的所有的参数。生命周期 componentWillMount 会调用调用 _updateProps 进行初始化，
        // 然后通过 store.subscribe 监听数据变化重新调用 _updateProps。

        _updateProps () {
            const { store } = this.context
            let stateProps = mapStateToProps(store.getState(), this.props) // 额外传入 props，让获取数据更加灵活方便
            this.setState({
                allProps: { // 整合普通的 props 和从 state 生成的 props
                    ...stateProps,
                    ...this.props
                }
            })
        }

        render () {
            return <WrappedComponent {...this.state.allProps} />
        }
    }

    return Connect
}