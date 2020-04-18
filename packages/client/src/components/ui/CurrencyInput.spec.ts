import { shallowMount } from '@vue/test-utils'
import { createContext } from 'jest-with-context'

import Input from '@/components/ui/Input.vue'

import CurrencyInput from './CurrencyInput.vue'

describe('CurrencyInput', () => {
  class TestContext {
    // @ts-ignore
    private wrapper

    // @ts-ignore
    private currencyInput

    public static withContext = createContext(new TestContext())

    private constructor() {
      this.wrapper = shallowMount(CurrencyInput)
      this.currencyInput = this.wrapper.vm
    }

    public givenCurrencyInputWithNoValue() {
      const wrapper = shallowMount(CurrencyInput)
      const input = wrapper.vm
      return input.$data.formattedValue.replace(/\s/g, ' ')
    }

    public givenCurrencyInputWithValue(value?: number) {
      const wrapper = shallowMount(CurrencyInput, { propsData: { value } })
      const input = wrapper.vm
      return input.$data.formattedValue.replace(/\s/g, ' ')
    }

    public givenCurrencyInputThenEmitInputEvent(value: string) {
      const input = this.wrapper.find(Input)
      input.vm.$emit('input', value)
    }

    public expectFormattedMessageToBe(expectedValue: string) {
      expect(expectedValue).toBe(this.currencyInput.$data.formattedValue.replace(/\s/g, ' '))
    }
  }

  TestContext.withContext('', ({ test }) => {
    test('should have a default input value as R$0.00', context => {
      const formattedValue = context.givenCurrencyInputWithNoValue()
      expect(formattedValue).toBe('R$ 0,00')
    })

    describe('cast number input value into currency input value', () => {
      test('should cast a positive number', context => {
        const formattedValue = context.givenCurrencyInputWithValue(15.3)
        expect(formattedValue).toBe('R$ 15,30')
      })

      test('should cast a negative number', context => {
        const formattedValue = context.givenCurrencyInputWithValue(-53.1)
        expect(formattedValue).toBe('-R$ 53,10')
      })
    })

    describe('number coming from input event', () => {
      test('should cast a positive number considering only number characters', context => {
        context.givenCurrencyInputThenEmitInputEvent('5123')
        context.expectFormattedMessageToBe('R$ 51,23')
      })

      test('should cast a negative number considering only number characters', context => {
        context.givenCurrencyInputThenEmitInputEvent('R$51.23-')
        context.expectFormattedMessageToBe('-R$ 51,23')
      })
    })
  })
})
