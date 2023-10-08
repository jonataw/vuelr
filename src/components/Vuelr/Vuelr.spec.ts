import { mount } from '@vue/test-utils';
import { beforeAll, expect, test } from 'vitest';
import { createVuelr } from '../..';
import { Vuelr } from './Vuelr';

beforeAll(() => {
  createVuelr();
});

test('mount component', async () => {
  expect(Vuelr).toBeTruthy();

  const wrapper = mount(Vuelr, {});
  expect(wrapper.attributes().id).toBeDefined();
});
