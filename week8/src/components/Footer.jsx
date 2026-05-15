import React from 'react'
import styled from 'styled-components'

const Footer = () => {
  return (
    <TagList>
      <Tag>중앙대학교</Tag>
      <Tag>경영학부</Tag>
    </TagList>
  )
}

export default Footer

const TagList = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  justify-content: center;
`
const Tag = styled.span`
  display: inline-block;
  padding: 4px 12px;
  background: #f3f4f6;
  color: #374151;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 700;
`