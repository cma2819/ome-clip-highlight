import { NodeCG } from './nodecg';

export const importCondition = (nodecg: NodeCG): void => {
  const logger = new nodecg.Logger(`${nodecg.bundleName}:import-condition`);
  const importConditionReplicant = nodecg.Replicant('importCondition');

  nodecg.listenFor('saveCondition', (condition) => {
    importConditionReplicant.value = condition;
    logger.info('Import condition saved.');
  });
}