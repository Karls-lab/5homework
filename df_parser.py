import pandas as pd 
import numpy as np

# df = pd.read_csv('data/co-est2016-alldata.csv', encoding='latin-1')
# print(df.head())
# df = df[df['STNAME'] == 'California']
# births = df[['CTYNAME', 'BIRTHS2015']] 
# popEstimate = df[['CTYNAME', 'DEATHS2015']] 
# births.to_csv('data/births.csv', index=False)
# popEstimate.to_csv('data/deaths.csv', index=False)



"""
Get enemployment data for each Californial county of in the year 2015
"""
df = pd.read_csv('data/output.csv')
df = df[['Year', 'State', 'County', 'Rate']]
df = df[df['Year'] == 2015]
df = df[df['State'] == 'California']
df = df[['County', 'Rate']]
df = df.groupby('County').agg({'Rate': 'mean'}).reset_index()
df['Rate'] = df['Rate'].round(2)
print(df.head(100))
df.to_csv('data/California_Unemployment.csv', index=False)


# filter countries down to United States, Germany, China, and Japan
# renewable_electricity = renewable_electricity[renewable_electricity['country']
                            # .isin(['United States', 'Germany', 'China', 'Japan', 'India'])]
# print(renewable_electricity.head(100))
# calculate renewable electricity per capita as a percentage of total electricity per capita
# renewable_electricity['renewables_elec_per_capita_percentage'] = renewable_electricity['renewables_elec_per_capita'] / renewable_electricity['per_capita_electricity'] 

# save to csv
# renewabl_electricity.to_csv('data/renewable_electricity.csv', index=False)


# df = pd.read_csv('data/owid-energy-data.csv')
# cols = df.columns
# df['year'] = pd.to_datetime(df['year'], format='%Y')
# # remove rows before 1965
# df = df[df['year'] >= '2000-01-01']
# renewable_electricity = df[['country', 'year', 'renewables_cons_change_pct']]
# # only grab the countries with the largest percent change
# grouped_df = df.groupby("country")["renewables_cons_change_pct"].sum().reset_index()
# sorted_df = grouped_df.sort_values(by="renewables_cons_change_pct", ascending=False)
# top_10_countries = sorted_df.head(10)
# top_10_countries.to_csv('data/top_renewable_pct_change.csv', index=False)

# filter countries down to United States, Germany, China, and Japan
# renewable_electricity = renewable_electricity[renewable_electricity['country']
                            # .isin(['United States', 'Germany', 'China', 'Japan', 'India'])]
# print(renewable_electricity.head(100))
# calculate renewable electricity per capita as a percentage of total electricity per capita
# renewable_electricity['renewables_elec_per_capita_percentage'] = renewable_electricity['renewables_elec_per_capita'] / renewable_electricity['per_capita_electricity'] 

# save to csv
# renewable_electricity.to_csv('data/renewable_electricity.csv', index=False)