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