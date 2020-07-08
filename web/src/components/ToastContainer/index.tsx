import React from 'react'
import { useTransition } from 'react-spring'

import Toast from '../ToastContainer/Toast'
import { ToastMassage } from '../../hooks/toast'
import { Container } from './styles'

interface ToastContainerProps {
    messages: ToastMassage[]
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
    const messagesWithTransitions = useTransition(
        messages, 
        message => message.id, 
        {
            from: { right: '-120%', opacity: 0 },
            enter: { right: '0%', opacity: 1 },
            leave: { right: '-120%', opacity: 0 }
        }
    )

    return (
        <Container>
            {messagesWithTransitions.map(({ item, key, props}) => (
                <Toast 
                    style={props}
                    key={key} 
                    message={item}
                />
            ))}
        </Container>
    )
}

export default ToastContainer