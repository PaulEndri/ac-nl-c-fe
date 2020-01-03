import React from 'react';
import NatureFooter from './nature/footer';
import NatureModal from './nature/modal';

interface FishModalProps {
	name: string;
}

const FishComponent = ({ name }: FishModalProps) => <NatureModal name={name} type="fish" />;

const FishFooter = ({ name }: FishModalProps) => <NatureFooter name={name} recordKey="Fishes" />;

export default {
	Component: FishComponent,
	Footer: FishFooter
};
