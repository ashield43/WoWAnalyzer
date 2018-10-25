import React from 'react';
import Analyzer from 'parser/core/Analyzer';
import SPELLS from 'common/SPELLS/index';
import TraitStatisticBox, { STATISTIC_ORDER } from 'interface/others/TraitStatisticBox';
import ItemHealingDone from 'interface/others/ItemHealingDone';

/**
 Your heals on targets below 50% health have a chance to heal for an additional 2100.
 */
class Savior extends Analyzer {
  healing = 0;
  procs = 0;

  constructor(...args) {
    super(...args);
    this.active = this.selectedCombatant.hasTrait(SPELLS.SAVIOR.id);
  }

  on_byPlayer_heal(event) {
    const spellId = event.ability.guid;

    if (spellId === SPELLS.SAVIOR_HEAL.id) {
      this.healing += event.amount + (event.absorbed || 0);
      this.procs += 1;
    }
  }

  statistic() {
    return (
      <TraitStatisticBox
        position={STATISTIC_ORDER.OPTIONAL()}
        trait={SPELLS.SAVIOR.id}
        value={(
          <ItemHealingDone amount={this.healing} />
        )}
        tooltip={`${this.procs} total heals.`}
      />
    );
  }
}

export default Savior;
