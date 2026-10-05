/* ==========================================================================
   Shared implementation-ladder logic.

   The five stages and the rule for deciding which stage something has reached
   live here so the public checklist and the partner portal cannot drift apart.
   ========================================================================== */
window.MHG_LADDER = (function () {
  'use strict';

  var STAGES = [
    { key: 'foundational', label: 'Foundational', sub: 'Starting point' },
    { key: 'developing',   label: 'Developing',   sub: 'Building momentum' },
    { key: 'established',  label: 'Established',  sub: 'Expanding implementation' },
    { key: 'advanced',     label: 'Advanced',     sub: 'Integrated practice' },
    { key: 'sustained',    label: 'Long-term sustainability', sub: '' }
  ];

  /* Every item in a guideline, in stage order. */
  function allItems(group) {
    return STAGES.reduce(function (acc, s) {
      return acc.concat(group.stages[s.key] || []);
    }, []);
  }

  /* A guideline has reached a stage when that stage — and every stage below it —
     is complete. The ladder is cumulative, so a gap stops the count. */
  function stageOf(group, isDone) {
    var reached = 0;
    for (var i = 0; i < STAGES.length; i++) {
      var list = group.stages[STAGES[i].key] || [];
      if (list.length && list.every(function (item) { return isDone(item.id); })) {
        reached = i + 1;
      } else {
        break;
      }
    }
    return reached;
  }

  function stageName(n) {
    return n === 0 ? 'Not yet at Foundational' : 'At ' + STAGES[n - 1].label;
  }

  /* A programme reaches a stage only when ALL seven guidelines have reached it.
     That follows the guide's own advice: go wide before you go deep. */
  function programStage(groups, isDone) {
    if (!groups.length) return 0;
    return groups.reduce(function (min, g) {
      return Math.min(min, stageOf(g, isDone));
    }, STAGES.length);
  }

  return {
    STAGES: STAGES,
    allItems: allItems,
    stageOf: stageOf,
    stageName: stageName,
    programStage: programStage
  };
})();
