import 'sanitize.css'
import React, { useState, useMemo } from 'react'
import ReactDOM from 'react-dom'
import styled, { createGlobalStyle } from 'styled-components'
import chunkp from 'chunk-pattern'
import { theme } from './theme'

type Format = 'phone_number' | 'group_by_threes' | 'group_by_fours'

type Formatter = (value: string) => string

const formatters: Record<Format, Formatter> = {
  phone_number: (value) => {
    const string = value.replace('63', '0').replace('+', '').replace(/\s/g, '')
    const chunked = chunkp(string.split(''), [4, 3, 4])
    return chunked.map((group: string[]) => group.join('')).join(' ')
  },
  group_by_threes: (value) => {
    const string = value.replace(/\s/g, '')
    const chunked = chunkp(string.split(''), [3])
    return chunked.map((group: string[]) => group.join('')).join(' ')
  },
  group_by_fours: (value) => {
    const string = value.replace(/\s/g, '')
    const chunked = chunkp(string.split(''), [4])
    return chunked.map((group: string[]) => group.join('')).join(' ')
  }
}

const App: React.FC = () => {
  const [input, setInput] = useState('')
  const [format, setFormat] = useState<Format>('phone_number')

  const content = input ? formatters[format](input) : ''

  return (
    <>
      <GlobalStyle />

      <Container>
        <Content>
          <Controls>
            <ControlsField>
              <Input
                type="text"
                placeholder="Enter number..."
                value={input}
                onChange={(evt) => setInput(evt.target.value)}
                autoFocus
              />
            </ControlsField>

            <ControlsField>
              <Select value={format} onChange={(evt) => setFormat(evt.target.value)}>
                <option value="phone_number">Phone Number</option>
                <option value="group_by_threes">Group By Threes</option>
                <option value="group_by_fours">Group By Fours</option>
              </Select>
            </ControlsField>
          </Controls>

          <InangNumberTo>{content || <span>&mdash;</span>}</InangNumberTo>
        </Content>
      </Container>
    </>
  )
}

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box
  }

  html, body {
    font-family: ${theme.fontFamily.sans};
    font-size: ${theme.fontSizes.base}px;
    color: ${theme.colors.white};
    background: ${theme.colors.neutral900};
  }
`

const Container = styled.div`
  padding: 32px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1400px;
  margin: 0 auto;
  height: 720px;
`

const Controls = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 48px;
`

const ControlsField = styled.div`
  width: 320px;

  &:not(:last-child) {
    margin-right: 32px;
  }
`

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 16px;
  background: transparent;
  color: ${theme.colors.white};
  font-size: ${theme.fontSizes.base}px;
  font-weight: 700;
  text-transform: uppercase;
  border: 1px solid ${theme.colors.neutral800};
  outline: 0;

  &::placeholder {
    color: ${theme.colors.neutral300};
  }

  &:focus {
    background: ${theme.colors.neutral700};
  }
`

const Select = styled.select`
  display: block;
  width: 100%;
  padding: 16px;
  background: transparent;
  color: ${theme.colors.white};
  font-size: ${theme.fontSizes.base}px;
  font-weight: 700;
  text-transform: uppercase;
  border: 1px solid ${theme.colors.neutral800};
  outline: 0;

  &:focus {
    background: ${theme.colors.neutral700};
  }
`

const InangNumberTo = styled.h1`
  margin: 0;
  font-size: 144px;
  font-weight: bold;
  width: 100%;
  color: ${theme.colors.purple};
`

ReactDOM.render(<App />, document.getElementById('root'))
