import styled from "styled-components";

const  DropDownSection = styled.section`
    padding: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 3px dashed lightgray;
    border-radius: 10px;

    div{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        
        h2{
            padding:15px
        }
    }
`;


const  FileDiv = styled.div`
   display:flex;
   justify-content: center;
   align-items: center;
   color:gray;
   font-size:14px;
   margin-bottom:10px;
   b{
   }

    p{
        margin-bottom:0px;
        margin-right:10px;
    }

`;
export {DropDownSection, FileDiv}