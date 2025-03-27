import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { Colors } from '@/constants/colors';
import { formatShortDate } from '@/utils/dateUtils';
import { useTheme } from '@/store/settingsStore';

interface EntryBarChartProps {
  data: {
    date: Date;
    count: number;
  }[];
}

export default function EntryBarChart({ data }: EntryBarChartProps) {
  const { isDarkMode } = useTheme();
  
  if (data.length === 0) return null;
  
  const maxValue = Math.max(...data.map(item => item.count));
  const chartHeight = 180;
  
  return (
    <View style={[
      styles.container,
      isDarkMode ? styles.containerDark : null
    ]}>
      <Text style={[
        styles.title,
        isDarkMode ? styles.titleDark : null
      ]}>
        Entries by Day
      </Text>
      
      <View style={styles.chartContainer}>
        {/* Y-axis labels */}
        <View style={styles.yAxis}>
          {[0, maxValue / 2, maxValue].map((value, index) => (
            <Text 
              key={index} 
              style={[
                styles.axisLabel,
                isDarkMode ? styles.axisLabelDark : null
              ]}
            >
              {Math.round(value)}
            </Text>
          ))}
        </View>
        
        {/* Bars */}
        <View style={styles.barsContainer}>
          {data.map((item, index) => {
            const barHeight = (item.count / maxValue) * chartHeight;
            
            return (
              <View key={index} style={styles.barWrapper}>
                <View style={styles.barLabelContainer}>
                  <View 
                    style={[
                      styles.bar, 
                      { height: barHeight > 0 ? barHeight : 1 },
                      isDarkMode ? styles.barDark : null
                    ]} 
                  />
                </View>
                <Text style={[
                  styles.barLabel,
                  isDarkMode ? styles.barLabelDark : null
                ]}>
                  {formatShortDate(item.date)}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
      }
    }),
  },
  containerDark: {
    backgroundColor: Colors.darkCard,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  titleDark: {
    color: Colors.darkText,
  },
  chartContainer: {
    flexDirection: 'row',
    height: 220,
    alignItems: 'flex-end',
  },
  yAxis: {
    width: 30,
    height: 180,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginRight: 8,
  },
  axisLabel: {
    fontSize: 10,
    color: Colors.lightText,
  },
  axisLabelDark: {
    color: Colors.darkLightText,
  },
  barsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 220,
  },
  barWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  barLabelContainer: {
    height: 180,
    justifyContent: 'flex-end',
  },
  bar: {
    width: 16,
    backgroundColor: Colors.accent,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  barDark: {
    backgroundColor: Colors.accent,
  },
  barLabel: {
    fontSize: 10,
    color: Colors.lightText,
    marginTop: 8,
    textAlign: 'center',
  },
  barLabelDark: {
    color: Colors.darkLightText,
  },
});