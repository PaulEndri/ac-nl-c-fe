import React from 'react';
import NatureFooter from './nature/footer';
import NatureModal from './nature/modal';

interface DeepSeaModalProps {
	name: string;
}

const DeepSeaComponent = ({ name }: DeepSeaModalProps) => <NatureModal name={name} type="deepsea" />;

const DeepSeaFooter = ({ name }: DeepSeaModalProps) => <NatureFooter name={name} recordKey="DeepSea" />;

export default {
	Component: DeepSeaComponent,
	Footer: DeepSeaFooter
};
