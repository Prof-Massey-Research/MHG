/* ==========================================================================
   Shared implementation logic.

   Each guideline has an ordered list of steps, mirroring the "Implementation
   protocol" on its page. Progress is how many of those steps are done.

   This replaced a five-stage model (Foundational / Developing / Established /
   Advanced / Sustained). Two problems with it: the guidelines have between two
   and six steps each, so five buckets were invented structure that some
   guidelines could never fill; and the tier names graded the organisation
   rather than describing the work. Only the two ends are named now — where you
   start, and where it leads — and everything between is expressed as distance
   travelled. The old version is at archive/checklist-data-5stage-REMOVED.js.
   ========================================================================== */
window.MHG_LADDER = (function () {
  'use strict';

  var START_LABEL = 'Start here';
  var END_LABEL   = 'Long-term sustainability';

  function allItems(group) { return group.steps || []; }

  function doneCount(group, isDone) {
    return allItems(group).filter(function (s) { return isDone(s.id); }).length;
  }

  function total(group) { return allItems(group).length; }

  /* 0..1 — how far this guideline has moved toward long-term sustainability. */
  function fractionOf(group, isDone) {
    var t = total(group);
    return t ? doneCount(group, isDone) / t : 0;
  }

  /* The program as a whole moves at the pace of its least-advanced guideline.
     That follows the guide's own advice: go wide before you go deep. */
  function programFraction(groups, isDone) {
    if (!groups.length) return 0;
    return groups.reduce(function (min, g) {
      return Math.min(min, fractionOf(g, isDone));
    }, 1);
  }

  /* Describes movement rather than assigning a tier. */
  function progressName(frac) {
    if (frac <= 0)   return 'Not yet started';
    if (frac >= 1)   return END_LABEL;
    if (frac < 0.34) return 'Foundations in place';
    return 'Building toward long-term sustainability';
  }

  function progressText(group, isDone) {
    return doneCount(group, isDone) + ' of ' + total(group);
  }

  return {
    START_LABEL: START_LABEL,
    END_LABEL: END_LABEL,
    allItems: allItems,
    total: total,
    doneCount: doneCount,
    fractionOf: fractionOf,
    programFraction: programFraction,
    progressName: progressName,
    progressText: progressText
  };
})();
