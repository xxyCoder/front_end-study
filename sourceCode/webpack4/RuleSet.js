class RuleSet {
  constructor(rules) {
    this.references = Object.create(null);
    this.rules = RuleSet.normalizeRules(rules, this.references, 'ref');
  }
  static normalizeRules(rules, refs, ident) {
    if (Array.isArray(rules)) {
      return rules.map((rule, idx) => {
        return RuleSet.normalizeRule(rule, refs, `${ident}-${idx}`);
      });
    } else if (rules) {
      return [RuleSet.normalizeRule(rules, refs, ident)];
    } else {
      return [];
    }
  }
  static normalizeRule(rule, refs, ident) {
    if (typeof rule === 'string') {
      return {
        use:[{
          loader: rule
        }]
      };
    }
    if (!rule || typeof rule !== 'object') return;

    const newRule = {};
    let condition;
    if (rule.test || rule.include || rule.exclude) {
      condition = {
        test: rule.test,
        include: rule.include,
        exclude: rule.exclude
      };
      newRule.resource = RuleSet.normalizeCondition(condition);
    }
    if (rule.resource) {
      newRule.resource = RuleSet.normalizeCondition(rule.resource);
    }
    if (rule.resourceQuery) {
      newRule.resourceQuery = RuleSet.normalizeCondition(rule.resourceQuery);
    }
    if (rule.loader && rule.loaders) return;
    const loader = rule.loaders || rule.loader;
    if (typeof loader === 'string' && !rule.options && !rule.query) {
      newRule.use = RuleSet.normalizeUse(loader.split('!'), ident);
    } else if(typeof loader === 'string' && (rule.options || rule.query)) {
      newRule.use = RuleSet.normalizeUse({
        loader,
        options: rule.options,
        query: rule.query
      }, ident);
    } else if (loader && (rule.options || rule.query)) {
      throw new Error('loaders不能和options以及query一起使用')
    } else if (loader) {
      newRule.use = RuleSet.normalizeUse(loader, ident);
    }

    if (rule.use) {
      newRule.use = RuleSet.normalizeUse(rule.use, ident);
    }
    if (rule.oneOf) {
      newRule.oneOf = RuleSet.normalizeRules(rule.oneOf, refs, `${ident}-oneOf`)
    }

    return newRule;
  }
  static normalizeCondition(condition) {
    if (typeof condition === 'string') {
      return str => str.indexOf(condition) === 0;
    }
    if (typeof condition === 'function') return condition;
    if (condition instanceof RegExp) return condition.test.bind(condition);
    if (Array.isArray(condition)) {
      const items = condition.map(c => RuleSet.normalizeCondition(c));
      return str => {
        for (let i = 0; i < items.length; ++i) {
          if (items[i](str)) return true;
        }
        return false;
      };
    }

    const matchers = [];
    Object.keys(condition).forEach(k => {
      const v = condition[k];
      switch(k) {
        case "include":
        case "test":
            if (v) matchers.push(RuleSet.normalizeCondition(v));
            break;
        case "exclude":
            if (v) {
              const matcher = RuleSet.normalizeCondition(v);
              matchers.push(str => !matcher(str));
            }
            break;
      }
    })
    if (matchers.length === 1) return matchers[0];
    return str => {
      for (let i = 0; i < items.length; ++i) {
        if (!items[i](str)) return false
      }
      return true;
    }   
  }
  static normalizeUse(use, ident) {
    if (typeof use === 'function') {
      return data => RuleSet.normalizeUse(use(data), ident);
    }
    if (Array.isArray(use)) {
      return use
        .map((item, idx) => RuleSet.normalizeUse(item, `${ident}-${idx}`))
        .reduce((arr, items) => arr.concat(items), [])
    }
    return [RuleSet.normalizeUseItem(use, ident)];
  }
  static normalizeUseItem(item, ident) {
    if (typeof item === 'string') {
      return RuleSet.normalizeUseItemString(item);
    }
    const newItem = {};
    newItem.options = item.options || item.query;
    const keys = Object.keys(item).filter(k => !["options", "query"].includes(k));
    for (const k of keys) {
      newItem[k] = item[k];
    }
    return newItem;
  }
  static normalizeUseItemString(itemString) {
    const idx = itemString.indexOf('?');
    if (idx !== -1) {
      return {
        loader: itemString.substr(0, idx),
        options: itemString.substr(idx + 1)
      };
    } else {
      return {
        loader: itemString,
        options: undefined
      };
    }
  }
}