// Motor de cálculo escalable para todas las escalas
module.exports = {
  compute(scale, inputs) {
    // Escalas categóricas tipo CHA2DS2-VASc
    if (scale.type === 'categorical') {
      let score = 0;
      scale.fields.forEach(f => {
        if (inputs[f.name]) score += f.points || 0;
      });

      if (scale.interpretation) {
        if (inputs.sex && scale.interpretation[inputs.sex]) {
          const ranges = scale.interpretation[inputs.sex];
          for (const key in ranges) {
            if (key.startsWith('≥')) {
              const min = parseInt(key.replace('≥', ''), 10);
              if (score >= min) return { score, interpretation: ranges[key] };
            } else if (parseInt(key, 10) === score) {
              return { score, interpretation: ranges[key] };
            }
          }
        } else if (scale.interpretation.ranges) {
          const range = scale.interpretation.ranges.find(r => score >= r.min && score <= r.max);
          return { score, interpretation: range ? range.meaning : 'Sin interpretación' };
        }
      }

      return { score, interpretation: 'Sin interpretación' };
    }

    // Escalas basadas en tabla / numéricas tipo APACHE II
    if (scale.type === 'table_based') {
      let total = 0;
      scale.fields.forEach(f => {
        if (inputs[f.id] != null) total += parseFloat(inputs[f.id]) || 0;
      });
      const range = scale.interpretation.ranges.find(r => total >= r.min && total <= r.max);
      return { score: total, interpretation: range ? range.meaning : 'Sin interpretación' };
    }

    // Si no se reconoce el tipo
    return { score: 0, interpretation: 'Tipo desconocido' };
  }
};
