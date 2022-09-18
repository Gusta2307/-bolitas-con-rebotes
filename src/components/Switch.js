import React, { useState } from 'react'
import styled from 'styled-components'

export default function Switch(props) {
    // const [checkBoxValue, setCheckBoxValue] = useState(false);


    const Label = styled.label`
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
        margin: 1vw 1vw 1vw 0vw;

        @media (max-width: 768px) {
            width: 37px;
            height: 22px;
        }
    `

    const Input = styled.input`
        opacity: 0;
        width: 0;
        height: 0;

        :checked + span:before {
            -webkit-transform: translateX(26px);
            -ms-transform: translateX(26px);
            transform: translateX(26px);
        }

        :focus + span {
            box-shadow: 0 0 1px #2196F3;
        }

        :checked + span { 
            // lawngreen
            background-color: lightgreen;
        }

        @media (max-width: 768px) {
            :checked + span:before {
                -webkit-transform: translateX(14px);
                -ms-transform: translateX(14px);
                transform: translateX(14px);
            }
        }
    `

    const Span = styled.span`
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
        border-radius: 34px;

        :before {
            position: absolute;
            content: "";
            height: 26px;
            width: 26px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            -webkit-transition: .4s;
            transition: .4s;
            border-radius: 50%;
        }

        @media (max-width: 768px) {
            :before {
                height: 15px;
                width: 15px;
            }
        }

    `

    return (
        <Label>
            <Input type="checkbox" checked={props.value} onChange={(e) => props.setter(e.target.checked)}></Input>
            <Span></Span>
        </Label>
    )
}