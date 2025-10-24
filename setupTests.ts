import '@testing-library/jest-dom';
import { expect } from 'vitest';
import serializer from 'jest-serializer-html';

expect.addSnapshotSerializer(serializer);
