import React from 'react';
import NatureFooter from './nature/footer';
import NatureModal from './nature/modal';
interface BugModalProps {
	name: string;
}

const BugComponent = ({ name }: BugModalProps) => <NatureModal name={name} type="bug" />;

const BugFooter = ({ name }: BugModalProps) => <NatureFooter name={name} recordKey="Bugs" />;

export default {
	Component: BugComponent,
	Footer: BugFooter
};
