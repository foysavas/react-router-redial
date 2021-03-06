import React, { Component } from 'react';
import { provideHooks } from 'redial';

@provideHooks({
  fetch: ({ setProps, getProps, force, isAborted }) => new Promise((resolve) => {
    const { color } = getProps();
    if(!color || force) {
      setTimeout(() => {
        if (isAborted()) {
          console.log('We should ignore this');
          return resolve();
        } else {
          console.log('Completed fine')
        }
        const getValue = () => Math.round(Math.random() * 255);
        setProps({color: `rgb(${getValue()}, ${getValue()}, ${getValue()})`});
        resolve();
      }, 2000);
    } else {
      resolve();
    }
  }),
  defer: ({ setProps, getProps, force }) => {
    const { data } = getProps();
    if(!data || force) {
      // Will be available as this.props.data on the component
      setProps({ data: 'Client data' })
    }
  },
  deferDone: () => console.log('deferDone'),
  blockingDone: () => console.log('blockingDone'),
})
export default class Index extends Component {
  render() {
    return (
      <div>
        <h1 style={{ color: this.props.color }}>React Router Redial</h1>
        <p>{ this.props.data }</p>
        <button onClick={ () => this.props.reload() }>Reload color</button>
        <pre>{ JSON.stringify(this.props, null, 2) }</pre>
      </div>
    );
  }
}
