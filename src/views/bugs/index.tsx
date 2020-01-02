import React from 'react';
import { Bugs } from 'ac-nl-sdk';
import EntityListView from '../../components/entityList';

const BugsView = () => <EntityListView data={Bugs} dataType="bug" title="Bugs" />;

export default BugsView;
