import styled from 'styled-components';


export const MetaAtingida = styled.h1<{mT: string}>`
    position: absolute;
    margin-top: ${props => props.mT};
    color: #fff;
    text-shadow: 2px 2px black;
`

export const Meta = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
` 

export const TitleCard = styled.h2`
    font-size: 24px;
`

export const CategoriesSpan = styled.span`
    font-size: 18px;
    display: block;
    width: 400px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`
export const Category = styled.span`
    background-color: gray;
    width: 20px;
    border-radius: 6px;
    font-size: 14px;
    color: white;
    margin-right: 10px;
    padding: 0 2px;
    font-weight: 500;
`
export const CampanhaId = styled.small`
    font-size: 14px;
`

export const NameCreator = styled.h4`
    font-size: 18px;
`

export const TotalRaised = styled.p`
    font-size: 18px;
`

export const GoalSpan = styled.span`
    font-size: 18px;
`

export const MetaParagraph = styled.p`
    font-size: 18px;
`

export const LastUpdate = styled.small`
    font-size: 12px;
`