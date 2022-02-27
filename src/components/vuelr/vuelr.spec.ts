import { mount } from '@vue/test-utils';
import { beforeAll, expect, test, it } from 'vitest';
import { createVuelr } from '../../';
import { Vuelr } from '..';

beforeAll(() => {
  createVuelr();
});

test('mount component', async () => {
  expect(Vuelr).toBeTruthy();

  const wrapper = mount(Vuelr, {});

  expect(wrapper.html()).toContain('-target');
  expect(wrapper.html()).toContain('-editor');
});
