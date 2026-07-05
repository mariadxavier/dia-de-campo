import { ClassifiedCategories } from "../types";
import { UF } from "../types/Location";

class Filters {
  public states: UF[] = [
    'Todo o Brasil',
    'AC',
    'AL',
    'AP',
    'AM',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MA',
    'MT',
    'MS',
    'MG',
    'PA',
    'PR',
    'PE',
    'PI',
    'RJ',
    'RN',
    'RS',
    'RO',
    'RR',
    'SC',
    'SP',
    'SE',
    'TO',
  ];

  public classifiedsCategories: ClassifiedCategories[] = ['vagas', 'insumos', 'servicos', 'produtos', 'maquinas', 'todos'];
}

export default new Filters();
