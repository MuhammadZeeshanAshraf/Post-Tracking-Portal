import styled from "styled-components";
import { colors } from "../commons/colors";

const LoginWrapper = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:center;  
    background-color: ${colors.secondary};;
    .login-card{
        display:flex;
        flex-direction:column;
        flex-direction: column;
        border-radius: 15px;
        justify-content: ce;
        align-items: center;
        padding-left:50px;
        padding-right:50px;
        padding-top:20px;
        padding-bottom:30px;
        color: ${colors.primary};

        
        .heading-div{
            color: ${colors.primary};
            align-items: center;
            margin: 30px;
            
            h2{
                margin-top: 10px;
                margin-left: 10px;
            }
        }
        .input{
            width:100%;
            margin:10px;
        }
        .btn-div{
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 35px;
            
            .login-btn{
                color: ${colors.white};
                background-color: ${colors.primary};
            }
        }
    }
`;

export {LoginWrapper};
