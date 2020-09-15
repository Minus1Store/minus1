import React from 'react';
import {
    TransitionGroup,
    Transition as ReactTransition,
  } from "react-transition-group"

import styles from './layout.module.scss'

const timeout = 450
const getTransitionStyles = {
  entering: {
    position: `absolute`,
    opacity: 0,
  },
  entered: {
    transition: `opacity ${timeout}ms ease-in-out`,
    opacity: 1,
  },
  exiting: {
    transition: `opacity ${timeout}ms ease-in-out`,
    opacity: 0,
  },
}

const Layout = ({location, children}) => {
    return (
        <TransitionGroup>
        <ReactTransition
          key={location.pathname}
          timeout={{
            enter: timeout,
            exit: timeout,
          }}
        >
          {status => (
            <div
              style={{
                ...getTransitionStyles[status],
              }}
            >
              <div className={styles.layout}>
                  {children}
              </div>
            </div>
          )}
        </ReactTransition>
      </TransitionGroup>
    )
}

export default Layout